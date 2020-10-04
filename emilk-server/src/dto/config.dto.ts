import Imap from "imap"

export interface ConfigDto {
	user: string;
	password: string;
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

export const fromImapConfig = (config: Imap.Config) => {
	delete (config as any).password
	return config
}
