//npm init -y (inicializar package.json)
//npx tsc --init (inicializar Typescript)

import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from '@fastify/jwt';

import { poolRoutes } from "./routes/pool";
import { authRoutes } from "./routes/auth";
import { gameRoutes } from "./routes/game";
import { guessRoutes } from "./routes/guess";
import { userRoutes } from "./routes/user";

async function bootstrap() {
    const fastify = Fastify({
        logger: true    //Gerar logs do servidor
    });

    await fastify.register(cors, {
        origin: true
    });

    // Ao subir em produção, este secret precisa ser uma variável de ambiente
    await fastify.register(jwt, {
        secret: "NLW10"
    });

    await fastify.register(authRoutes);
    await fastify.register(gameRoutes);
    await fastify.register(guessRoutes);
    await fastify.register(poolRoutes);
    await fastify.register(userRoutes);

    await fastify.listen({ port: 3333, host: "0.0.0.0" });
}

bootstrap();

//npx tsc converte o código typescript para javascript