namespace TsLogin {
    interface FormModel {
        username: string;
        password: string;
        code: string;
        uuid: string;
    }
    interface Login {
        token: string;
    }
    interface Image {
        img: TsImage.Model,
        uuid: string,
    }
    interface RawdataImage extends Image {}
}