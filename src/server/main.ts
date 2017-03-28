import { User } from './User';
import { Session, SessionMap } from './Session';

import * as express from 'express';
import * as http from 'http';
import * as url from 'url';
import { Server } from 'ws';


let sessionTracker:SessionMap = {};

let app = express();
app.use(express.static('./dist'));

let server = http.createServer(app);
let wss = new Server({ server });

wss.on('connection', conn => {
    let location = url.parse(conn.upgradeReq.url, true);

    let userName = location.query.user;
    let boardId = parseInt(location.query.board);

    if (!userName || !boardId) {
        console.log('Missing userName or boardId, closing connection.');
        conn.close();
    }
    else {
        let session = sessionTracker[boardId];
        if (!session) {
            session = new Session(boardId);
            sessionTracker[boardId] = session;
        }
        
        let user = new User(userName, conn);
        session.join(user);
    }
});


console.log('Listening on 3000...');
server.listen(3000);