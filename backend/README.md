 
# Setup environment
- virtualenv env -p python3
- source env/bin/activate
- pip install -r requirements.txt
 
# Run web server

 - python manage.py runserver 8080

# Login
 
- http://127.0.0.1:8080/core/api/v1/quest-counter/
- User: uit
- Password: uit@123

# Test API
- GET: curl -X GET http://127.0.0.1:8080/core/api/v1/quest-counter/?format=json
- 