from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

#SQLALCHEMY_DATABASE_URL = "sqlite:///./sql_app.db"
# Using MySQL with PyMySQL connector
SQLALCHEMY_DATABASE_URL = "mysql+pymysql://<root>:<jiaqizhu22>@<localhost>/<npproblems>[?<options>]"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
