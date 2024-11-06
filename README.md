# KeeperNotes

KeeperNotes is a comprehensive web application designed to help users efficiently manage personal notes, groups, and members. With powerful features for organizing, collaborating, and sharing, it allows users to create, edit, and delete notes, while seamlessly managing group memberships. Whether you're working solo or collaborating with a team, KeeperNotes offers an intuitive interface to keep your notes and groups organized, ensuring easy access and collaboration for all.

## Features

- **Create, Edit, and Delete Notes**: Easily manage your notes with the option to add, update, or delete them.
- **Groups and Members**: Create and manage groups, add members, and organize notes within these groups.
- **Add Notes to Groups**: Share notes with groups for collaboration and easier organization.
- **Favorites**: Mark notes as favorites for quick access.
- **Responsive UI**: Optimized for desktop devices.
- **User Authentication**: Secure login to keep your notes and groups private.
- **Schedule Notes**: Set a schedule for your notes to be displayed or reminded at specific times.

## Planned Features

- **Add Websockets**: Implement real-time updates for group collaboration and note sharing.
- **Front-End Tests**: Add unit and integration tests to ensure the front-end is functioning correctly.
- **See Available Members and Manage Your Group**: View all available members and manage group memberships, including adding or removing members.
- **Forgot Password**: Implement a "Forgot Password" feature to allow users to reset their passwords securely.

## Technologies Used

- **Frontend**: React.js, Material UI, styled-components
- **Backend**: Node.js, Express.js, PostgreSQL, Sequelize ORM
- **Containerization**: Docker
- **Testing**: Jest

## Installation

Follow these steps to run the project locally.

1. Clone the repository:

```bash
git clone https://github.com/michfingerut/KeeperNotes.git
```

2. Navigate to the project directory:

```bash
  cd KeeperNotes
```

3.  Set up your environment variables:

- Make sure you have a `.env` file with the correct values.
- You can use `env_example` as a template for required variables.

4.  Run the project:

```bash
  ./scripts/start.sh
```
