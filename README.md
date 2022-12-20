### Frame Perfect

Docker is required to run the following command. This creates a container running MongoDB with replica sets.
```
sudo docker run -d -p 27017:27017 --name fp-mongo -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=example -e INIT_WAIT_SEC=3 prismagraphql/mongo-single-replica:4.4.3-bionic
```

Afterwards run 
```
npm install
```
```
npx prisma db push
```
```
npx prisma generate
```

Finally to start run 
```
npm run dev
```
You now may visit http://localhost:3000/api/init in order to add all the games to the database.
