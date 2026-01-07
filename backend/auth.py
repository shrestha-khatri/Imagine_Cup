# TEMPORARY AUTH (NO HASHING)
# This avoids bcrypt/passlib Windows issues
# We will add hashing back later using Azure AD / JWT

def hash_password(password: str):
    return password

def verify_password(password: str, hashed: str):
    return password == hashed
