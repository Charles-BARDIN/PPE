import { ILoginAuthAccess } from '.';
import { ILoginValidator } from '.';
import { ILoginController } from '.';
import { ILoginNavAccess } from '.';

export class LoginService {
    private _auth: ILoginAuthAccess;
    private _nav: ILoginNavAccess;
    private _validator: ILoginValidator;
    private _controller: ILoginController;

    constructor(config: {
        authentification: ILoginAuthAccess,
        navigation: ILoginNavAccess,
    }) {
        this._auth = config.authentification;
        this._nav = config.navigation;
    }

    set controller(controller: ILoginController) {
        this._controller = controller;
    }

    set validator(validator: ILoginValidator) {
        this._validator = validator;
    }

    public login(credentials: { mail: string, password: string }) {
        let errors = [];

        if (!credentials.mail || !this._validator.validateMail(credentials.mail)) {
            errors.push('ERR_LOGIN_MAIL_FORMAT');
        }

        if (!credentials.password) {
            errors.push('ERR_LOGIN_PASSWORD_REQUIRED');
        }

        if (errors.length) {
            this._controller.showValidationErrors(errors);
            return;
        }

        this._auth.login(credentials)
            .then(res => this._nav.goTo('rooms'))
            .catch(err => this._controller.showBackendErrors(err))
    }
}
