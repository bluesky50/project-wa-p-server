import Koa from 'koa';
import { createServer } from 'http';

import { normalizePort, onError, onListening } from '../utils/serverHelpers';

import debug from '../lib/debugger';
import IServer from '../interfaces/class/IServer';
import IOrmAdapter from '../interfaces/class/IOrmAdapter';
import { applyMiddleware, addGraphQLRoute } from '../utils/serverInitHelpers';

export class Server implements IServer {
	public app: Koa;
	public ormAdapter: IOrmAdapter;
	public httpServer: any;
	private serverConfig: any;

	constructor(serverConfig: { config: any, app: any, ormAdapter: any }) {
		this.app = serverConfig.app;
		this.ormAdapter = serverConfig.ormAdapter;
		this.httpServer = null;
		this.serverConfig = serverConfig.config;
	}

	public run() {
		this._pre();
		this._start();
		this._post();
	}

	public close() {
		debug('Shutdown sequence...');
		this.ormAdapter.disconnect();
		this.httpServer.close();
		process.exit();
	}

	/**
	 * Server flow functions.
	 */
	private _pre() {
		debug('Pre sequence...');
		this._initializeDataSouce();
		this._initializeApp();
		this._initializeRoutes();
	}

	private _start() {
		debug('Start sequence...');

		const port = normalizePort(this.serverConfig.port);
		this.httpServer = createServer(this.app.callback());
		this.httpServer.on('error', onError(port));
		this.httpServer.on('listening', onListening(this.httpServer));
		this.httpServer.listen(port);
	}

	private _post() {
		debug('Start sequence...');
	}

	/**
	 * Server _pre functions
	 */
	private _initializeDataSouce() {
		if (this.ormAdapter === undefined || this.ormAdapter === null) {
			// this.ormAdapter = new OrmAdapter(this.serverConfig.dbUri + this.serverConfig.appName);
			// this.ormAdapter.connect();
		}
	}

	private _initializeApp() {
		if (this.app === undefined || this.app === null) {
			
			this.app = new Koa();
			applyMiddleware(this.app);	
		}
	}

	private _initializeRoutes() {
		// Create graphql endpoint.
		addGraphQLRoute(this.app, this.serverConfig.gqlEndpoint, {});
	}
}

export default Server;
