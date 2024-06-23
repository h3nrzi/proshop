```bash - frontend
my-app/
│
├── public/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   │   └── specific/
│   │
│   ├── features/
│   │   ├── feature1/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── services/
│   │   │   └── feature1Slice.js
│   │   └── feature2/
│   │       ├── components/
│   │       ├── hooks/
│   │       ├── services/
│   │       └── feature2Slice.js
│   │
│   ├── hooks/
│   │   └── useCustomHook.js
│   │
│   ├── pages/
│   │   ├── Page1.js
│   │   └── Page2.js
│   │
│   ├── store/
│   │   ├── rootReducer.js
│   │   └── store.js
│   │
│   ├── utils/
│   │   ├── api.js
│   │   ├── constants.js
│   │   └── helpers.js
│   │
│   ├── App.js
│   ├── index.js
│   └── ...
│
├── .env
├── package.json
└── ...
```

```bash - backend
my-express-app
├── src
│   ├── controllers
│   │   └── userController.ts
│   ├── routes
│   │   └── userRoutes.ts
│   ├── models
│   │   └── userModel.ts
│   ├── middlewares
│   │   └── authMiddleware.ts
│   ├── services
│   │   └── userService.ts
│   ├── utils
│   │   └── logger.ts
│   ├── app.ts
│   └── server.ts
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
└── tsconfig.build.json
```
