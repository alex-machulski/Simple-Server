import express, {Express} from 'express';
import {Server} from 'http';
import {ILogger} from './logger/logger.interface';
import {inject, injectable} from 'inversify';
import {TYPES} from './types';
import {json} from 'body-parser';
import 'reflect-metadata';
import {IConfigService} from "./config/config.service.interface";
import {IExceptionFilter} from "./errors/exception.filter.interface";
import {UserController} from "./users/users.controller";
import {PrismaService} from "./database/prisma.service";

@injectable()
export class App {
    app: Express;
    server: Server;
    port: number;

    constructor(
        @inject(TYPES.ILogger) private loggerService: ILogger,
        @inject(TYPES.UserController) private userController: UserController,
        @inject(TYPES.ExceptionFilter) private exceptionFilter: IExceptionFilter,
        @inject(TYPES.ConfigService) private configService: IConfigService,
        @inject(TYPES.PrismaService) private prismaService: PrismaService,

    ) {
        this.app = express();
        this.port = 8000;
    }

    useMiddleware(): void {
        this.app.use(json());
    }

    useRoutes(): void {
        this.app.use('/users', this.userController.router);
    }

    useExceptionFilters(): void {
        this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
    }

    public async init(): Promise<void> {
        this.useMiddleware();
        this.useRoutes();
        this.useExceptionFilters();
        await this.prismaService.connect();
        this.server = this.app.listen(this.port);
        this.loggerService.log(`Сервер запущен на http://localhost:${this.port}`);
    }
}
