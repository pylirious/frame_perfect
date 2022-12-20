# Frame Perfect
## Installation
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
## Features
1. Login using oAuth [All sites from Navbar or on the Homepage](http://localhost:3000/)
2. Initialize the games [/api/init](http://localhost:3000/api/init)
3. List all speed-runs [/speedruns](http://localhost:3000/speedruns)
4. List all games [/games](http://localhost:3000/games)
5. View all speed-runs of a game [/game/[id]](http://localhost:3000/game/minecraft) (minecraft as example)
6. View details about a speed-run [/speedrun/[id]](http://localhost:3000/speedrun/)
7. View details about your user [/profile](http://localhost:3000/profile)
8. Change your Role between "Moderator" and "Runner" [/secret](http://localhost:3000/secret)
9. As Moderator: Approve/Verify runs [/speedrun/[id]](http://localhost:3000/speedrun/)
10. As Moderator: Delete any run [/speedrun/[id]](http://localhost:3000/speedrun/)
11. As Runner: Delete your own run [/speedrun/[id]](http://localhost:3000/speedrun/)
12. As Moderator: Send notifications to any user [/admin/notifications](http://localhost:3000/admin/notifications/)