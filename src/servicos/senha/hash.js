import bcrypt from 'bcryptjs';

// Função para fazer o hash da senha
const hashPassword = async (senha) => {
    const salt = await bcrypt.genSalt(10); // Gera um salt
    const hashedPassword = await bcrypt.hash(senha, salt); // Faz o hash da senha
    return hashedPassword;
};

// Função para verificar a senha
const verifyPassword = async (senha, hashedPassword) => {
    const isMatch = await bcrypt.compare(senha, hashedPassword); // Compara a senha com o hash
    return isMatch; // Retorna true se a senha for válida
};

// Exemplo de uso
const exemplo = async () => {
    const senha = 'minhaSenhaSegura';
    const hashed = await hashPassword(senha);
    console.log('Senha Hasheada:', hashed);

    const isValid = await verifyPassword(senha, hashed);
    console.log('Senha é válida?', isValid); // Deve retornar true
};

exemplo();
