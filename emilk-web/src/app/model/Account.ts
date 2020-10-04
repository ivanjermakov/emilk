export interface Account {
	user: string;
	xoauth?: string;
	xoauth2?: string;
	host?: string;
	port?: number;
	tls?: boolean;
	tlsOptions?: Object;
	autotls?: string;
	connTimeout?: number;
	authTimeout?: number;
	keepalive?: any;
}
