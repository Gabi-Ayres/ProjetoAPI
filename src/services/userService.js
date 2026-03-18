
export let users = [];
let idUser = 0;


// Função para obter todos os usarios com busca e ordenação
export const getAllUsers = (search, sort) => {
    if (!search && !sort) {
        return users;
    }

    let orderedUsers = [...users];

    if (typeof search === "string") {
        orderedUsers = orderedUsers.filter(u => u.name.toLowerCase().includes(search.toLowerCase()));
    }
    
    if (sort === "asc") {
        orderedUsers.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "desc") {
        orderedUsers.sort((a, b) => b.name.localeCompare(a.name));
    }

    return orderedUsers;
}

export const getUserById = (id) => users.filter((u) => u.id === parseInt(id));


//Frunção para criar um novo usuário
export const createUser = (data) => {
    const newUser = {
        id: ++idUser,
        name: data.name,
        email: data.email,
        active: data.active ?? true
    }
    users.push(newUser);
    return newUser;
}

// Função para atualizar um usuário
export const updateUser = (userId, data) => {
    const user = users.find(u => u.id === parseInt(userId));

    if(!user) {
        throw new Error("User not found");
    }
    user.name = data.name ?? user.name;
    user.email = data.email ?? user.email;
    user.active = data.active ?? user.active;
    return user;
} 

// Função para deletar um usuário
export const deleteUser = (userId) => {
    users = users.filter(u => u.id !== parseInt(userId));
}



