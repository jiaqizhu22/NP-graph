from sqlalchemy import Boolean, Column, ForeignKey, Numeric, Integer, String, DateTime, func
from sqlalchemy.orm import relationship

from database import Base

class Users(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)


class Problems(Base):
    __tablename__ = "problems"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    also_known_as = Column(String)
    introduced_at = Column(String)
    parameters = Column(String)
    algorithms = Column(String)
    category = Column(String)
    implemented = Column(Boolean)