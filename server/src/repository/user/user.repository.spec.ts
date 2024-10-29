import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from './user.repository'; // Путь к вашему файлу UserRepository
import { PrismaService } from 'src/lib/PrismaService';
import { RepositoryModule } from '../repository.module';

describe('UserRepository', () => {
  let userRepository: UserRepository;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [RepositoryModule], // Импортируете существующий модуль
    })
      .overrideProvider(PrismaService) // Переопределяете PrismaService мок-объектом
      .useValue({
        user: {
          create: jest.fn(), // Мок метода create
          findUnique: jest.fn(),
        },
      })
      .compile();


    userRepository = module.get<UserRepository>(UserRepository);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should create a user with the correct data', async () => {
    const createUserParams = {
      email: 'test@example.com',
      password: '123',
      businessEntityName: 'Test Business',
      relationTypeCode: 'relationType123',
      businessEntityTypeCode: 'entityType123',
    };

    await userRepository.createUser(createUserParams);

    expect(prismaService.user.create).toHaveBeenCalledWith({
      data: {
        email: createUserParams.email,
        password: createUserParams.password,
        relation: {
          create: {
            businessEntity: {
              create: {
                name: createUserParams.businessEntityName,
                businessEntityType: {
                  connect: { code: createUserParams.businessEntityTypeCode },
                },
              },
            },
            relationType: {
              connect: { code: createUserParams.relationTypeCode },
            },
          },
        },
      },
    });
  });

  it('find user by id', async () => {
    const userId = 1;

    // Вызов тестируемого метода
    await userRepository.findById(userId);

    // Проверка, что prisma.user.findUnique был вызван с нужными аргументами
    expect(prismaService.user.findUnique).toHaveBeenCalledWith({
      where: {
        id: userId,
      },
    });
  });

  it('find user by email', async () => {
    const email = 'test@test.com';

    // Вызов тестируемого метода
    await userRepository.findByEmail(email);

    // Проверка, что prisma.user.findUnique был вызван с нужными аргументами
    expect(prismaService.user.findUnique).toHaveBeenCalledWith({
      where: {
        email,
      },
    });
  });
});
