
const userService = require("../../services/userService");

describe('User Service', () => {
    let user = {
        name: "Some New",
        surname: "Name",
        email: "newUser@email.com",
        password: "newUserpass"
    };

    it('create', async () => {

        let userCreated = await userService.create(user);

        expect(userCreated.userId).toBe(1);
        expect(userCreated.name).toBe("Some New");
        expect(userCreated.surname).toBe("Name");
        expect(userCreated.email).toBe("newUser@email.com");
        expect(userCreated.password).toBe("newUserpass");
        expect(userCreated.role).toBe("user");
    })

    it('findByEmail', async () => {
        let userFound = await userService.findByEmail(user.email);

        expect(userFound.userId).toBe(1);
        expect(userFound.name).toBe("Some New");
        expect(userFound.surname).toBe("Name");
        expect(userFound.email).toBe("newUser@email.com");
        expect(userFound.password).toBe("newUserpass");
        expect(userFound.role).toBe("user");
    })
})