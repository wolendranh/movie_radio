from config.settings import STREAM_COLLECTION
from bson.objectid import ObjectId

from radio_db.models import BaseModel


class Stream(BaseModel):
    
    def __init__(self, db, data):
        super().__init__(db, collection=db[STREAM_COLLECTION])
        self.stream_ip = data.get('stream_ip')
        self.name = data.get('name')
        self.id = data.get('id')
        self.user_id = ObjectId(data.get('user_id'))
