from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

import models, schemas, auth
from database import engine, SessionLocal

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Smart City Healthcare Backend")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def root():
    return {"status": "Backend running"}

@app.post("/hospital/register")
def register_hospital(data: schemas.HospitalRegister, db: Session = Depends(get_db)):
    print("Registering hospital:", data.name) #for debugging only
    existing = db.query(models.Hospital).filter(models.Hospital.name == data.name).first()
    if existing:
        raise HTTPException(status_code=400, detail="Hospital already exists")

    hospital = models.Hospital(
        name=data.name,
        latitude=data.latitude,
        longitude=data.longitude,
        password_hash=auth.hash_password(data.password)
    )
    db.add(hospital)
    db.commit()
    return {"message": "Hospital registered"}

@app.post("/hospital/login")
def hospital_login(data: schemas.HospitalLogin, db: Session = Depends(get_db)):
    hospital = db.query(models.Hospital).filter(models.Hospital.name == data.name).first()
    if not hospital or not auth.verify_password(data.password, hospital.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {"message": "Login successful", "hospital_id": hospital.id}

@app.post("/user/register")
def register_user(data: schemas.UserRegister, db: Session = Depends(get_db)):
    existing = db.query(models.User).filter(models.User.name == data.name).first()
    if existing:
        raise HTTPException(status_code=400, detail="User already exists")

    user = models.User(
        name=data.name,
        password=data.password
    )
    db.add(user)
    db.commit()
    return {"message": "User registered"}


@app.post("/user/login")
def user_login(data: schemas.UserLogin, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.name == data.name).first()
    if not user or user.password != data.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {"message": "Login successful", "user_id": user.id}


@app.post("/hospital/{hospital_id}/beds")
def update_beds(
    hospital_id: int,
    data: schemas.BedUpdate,
    db: Session = Depends(get_db)
):
    bed = db.query(models.Bed).filter(
        models.Bed.hospital_id == hospital_id
    ).first()

    if bed:
        bed.total_beds = data.total_beds
        bed.available_beds = data.available_beds
    else:
        bed = models.Bed(
            hospital_id=hospital_id,
            total_beds=data.total_beds,
            available_beds=data.available_beds
        )
        db.add(bed)

    db.commit()
    return {"message": "Beds updated"}


@app.get("/hospitals/beds")
def view_beds(db: Session = Depends(get_db)):
    return db.query(models.Bed).all()

@app.post("/hospital/{hospital_id}/opd")
def add_opd(
    hospital_id: int,
    data: schemas.OPDCreate,
    db: Session = Depends(get_db)
):
    opd = models.OPD(
        hospital_id=hospital_id,
        department=data.department,
        queue_length=data.queue_length
    )
    db.add(opd)
    db.commit()
    return {"message": "OPD updated"}

@app.get("/hospitals/opd")
def view_opd(db: Session = Depends(get_db)):
    return db.query(models.OPD).all()

@app.post("/hospital/{hospital_id}/equipment")
def add_equipment(
    hospital_id: int,
    data: schemas.EquipmentCreate,
    db: Session = Depends(get_db)
):
    eq = models.Equipment(
        hospital_id=hospital_id,
        name=data.name,
        quantity=data.quantity
    )
    db.add(eq)
    db.commit()
    return {"message": "Equipment added"}


@app.get("/hospitals/equipment")
def view_equipment(db: Session = Depends(get_db)):
    return db.query(models.Equipment).all()

@app.post("/hospital/{hospital_id}/specialists")
def add_specialist(
    hospital_id: int,
    data: schemas.SpecialistCreate,
    db: Session = Depends(get_db)
):
    sp = models.Specialist(
        hospital_id=hospital_id,
        name=data.name,
        specialty=data.specialty,
        timing=data.timing
    )
    db.add(sp)
    db.commit()
    return {"message": "Specialist added"}


@app.get("/hospitals/specialists")
def view_specialists(db: Session = Depends(get_db)):
    return db.query(models.Specialist).all()

@app.post("/hospital/{hospital_id}/bed-book")
def book_bed(
    hospital_id: int,
    data: schemas.BedBookingCreate,
    db: Session = Depends(get_db)
):
    booking = models.BedBooking(
        hospital_id=hospital_id,
        user_id=data.user_id
    )
    db.add(booking)
    db.commit()
    return {"message": "Bed booking request sent"}



@app.get("/hospital/{hospital_id}/bed-requests")
def view_bed_requests(hospital_id: int, db: Session = Depends(get_db)):
    return db.query(models.BedBooking).filter(
        models.BedBooking.hospital_id == hospital_id
    ).all()

@app.post("/specialist/{specialist_id}/book")
def book_appointment(
    specialist_id: int,
    data: schemas.AppointmentCreate,
    db: Session = Depends(get_db)
):
    appt = models.Appointment(
        specialist_id=specialist_id,
        user_id=data.user_id
    )
    db.add(appt)
    db.commit()
    return {"message": "Appointment request sent"}


@app.get("/specialist/{specialist_id}/appointments")
def view_appointments(specialist_id: int, db: Session = Depends(get_db)):
    return db.query(models.Appointment).filter(
        models.Appointment.specialist_id == specialist_id
    ).all()
