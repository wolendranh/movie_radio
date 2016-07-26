import os
import base64
from cryptography.fernet import Fernet
from cryptography.hazmat.primitives.hashes import SHA256
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.backends import default_backend
from settings import FERNET_SECRET_KEY


def encrypt(user_pwd):
    # Generate a salt for use in the PBKDF2 hash
    salt = os.urandom(16)  # Recommended method from cryptography.io
    # Set up the hashing algo
    kdf = PBKDF2HMAC(
        algorithm=SHA256(),
        length=32,
        salt=salt,
        iterations=100000,  # This stretches the hash against brute forcing
        backend=default_backend(),  # Typically this is OpenSSL
    )
    # Derive a binary hash and encode it with base 64 encoding
    hashed_pwd = base64.urlsafe_b64encode(kdf.derive(user_pwd))

    # Set up AES in CBC mode using the hash as the key
    f = Fernet(hashed_pwd)
    encrypted_secret = f.encrypt(FERNET_SECRET_KEY)

    # Store the safe inputs in the DB, but do NOT include a hash of the
    # user's password, as that is the key to the encryption! Only store
    # the salt, the algo and the number of iterations.
    return {'secret': encrypted_secret, 'algo': 'pbkdf2_sha256', 'iterations': 100000, 'salt': salt}


def decrypt(encrypted_secret, algo, interations, salt, user_pwd):

    # Set up the Key Derivation Formula (PBKDF2)
    kdf = PBKDF2HMAC(
        algorithm=SHA256(),
        length=32,
        salt=str(salt),
        iterations=int(interations),
        backend=default_backend(),
    )
    # Generate the key from the user's password
    key = base64.b64encode(kdf.derive(user_pwd))

    # Set up the AES encryption again, using the key
    f = Fernet(key)

    # Decrypt the secret!
    secret = f.decrypt(encrypted_secret)
    return secret