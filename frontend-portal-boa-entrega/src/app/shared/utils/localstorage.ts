export class LocalStorageUtils {
    
    public obterUsuario() {
        return JSON.parse(localStorage.getItem('boaentrega.user'));
    }

    public salvarDadosLocaisUsuario(response: any) {
        this.salvarTokenUsuario(response.accessToken);
        this.salvarUsuario(response.userToken);
    }

    public limparDadosLocaisUsuario() {
        localStorage.removeItem('boaentrega.token');
        localStorage.removeItem('boaentrega.user');
    }

    public obterTokenUsuario(): string {
        return localStorage.getItem('boaentrega.token');
    }

    public salvarTokenUsuario(token: string) {
        localStorage.setItem('boaentrega.token', token);
    }

    public salvarUsuario(user: string) {
        localStorage.setItem('boaentrega.user', JSON.stringify(user));
    }

}