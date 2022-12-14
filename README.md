### Frame Perfect

Docker is required to run.
```
sudo docker run -d -p 27017:27017 --name fp-mongo -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=example mongo
```
to start the database

add `MONGODB_URI=mongodb://root:example@localhost:27017/` to the .env.local file

after that run 
```
npm run dev
```
