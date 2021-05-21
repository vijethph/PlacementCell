[![Status](https://img.shields.io/badge/status-active-success.svg?style=flat-square&logo=react)]()
[![GitHub issues](https://img.shields.io/github/issues/vijethph/PlacementCell?style=flat-square)](https://github.com/vijethph/PlacementCell/issues)
[![Contributors](https://img.shields.io/github/contributors/vijethph/PlacementCell?style=flat-square)](https://github.com/vijethph/PlacementCell/graphs/contributors)
[![GitHub forks](https://img.shields.io/github/forks/vijethph/PlacementCell?color=blue&style=flat-square)](https://github.com/vijethph/PlacementCell/network)
[![GitHub stars](https://img.shields.io/github/stars/vijethph/PlacementCell?color=yellow&style=flat-square)](https://github.com/vijethph/PlacementCell/stargazers)
[![GitHub license](https://img.shields.io/github/license/vijethph/PlacementCell?style=flat-square)](https://github.com/vijethph/PlacementCell/blob/master/LICENSE)
[![made-with-react](https://img.shields.io/badge/made%20with-react-143d59.svg?style=for-the-badge&labelColor=f4b41a&logo=react)](https://reactjs.org)
[![forthebadge](https://forthebadge.com/images/badges/fo-real.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/powered-by-energy-drinks.svg)](https://forthebadge.com)

<br />
<p align="center">
  <a href="https://github.com/vijethph/PlacementCell">
    <img src="images/human-resources.png" alt="Logo" width="120" height="120">
  </a>

  <h2 align="center">Placement Cell</h2>

  <p align="center">
    A MERN Stack App that provides a recruitment preparation portal for students.
    <br />
    <br />
    <a href="https://github.com/vijethph/PlacementCell/issues">Report Bug</a>
    ·
    <a href="https://github.com/vijethph/PlacementCell/issues">Request Feature</a>
    .
    <a href="https://github.com/vijethph/PlacementCell/pulls">Send a Pull Request</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [About the Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

<!-- ABOUT THE PROJECT -->

## About The Project

<img src="images/videos.png" width="620" height="380" alt="Aptitude Practice Videos Page"> <img src="images/discussionforum.png" width="620" height="580" alt="Discussion Forum Page">
<img src="images/quiz.png" width="620" height="380" alt="Quiz Page"> <img src="images/ide.png" width="620" height="380" alt="Code Compiler Page">

This is React app that uses [MongoDB](https://www.mongodb.com), [Express Framework](https://expressjs.com), [Node.js](https://nodejs.org/en) and [React Framework](https://reactjs.org) to provide a company recruitment preparation platform for students. It has features like discussion forum, quiz portal, aptitude practice videos and dashboard for latest placement updates from companies, to help students prepare for company recruitment drives. It also makes use of [HackerEarth API](https://www.hackerearth.com/docs/wiki/developers/v3/) to simulate a functional online code compiler with support for C, C++, Java and Python Languages.

### Built With

This project is entirely built with the following components and languages:

- [MongoDB](https://www.mongodb.com)
- [Express Framework](https://expressjs.com/)
- [React Framework](https://reactjs.org)
- [Node.js Runtime](https://nodejs.org/en)
- [HackerEarth API](https://www.hackerearth.com/docs/wiki/developers/v3/)

<!-- GETTING STARTED -->

## Getting Started

Follow these instructions in order to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Node.js>=10 and MongoDB>=4.2 should be installed. After installation, check Node.js version, and MongoDB daemon status using

```sh
node --version
service mongod status
```

### Installation

1. Clone the repo

```git
git clone https://github.com/vijethph/PlacementCell.git
```

2. Open the downloaded folder

```sh
cd PlacementCell
```

3. Modify the MongoDB URI in `server.js` file as per your DB configuration. Sign up for HackerEarth, retrieve an API key, and place it in `IDE.js` file inside `client/src/components` folder. Then import the required dependencies in project folder and `client` folders using

```sh
npm install
```

4. Run the program using

```sh
npm run dev
```

The app should be running in `http://localhost:3000` in your browser.

<!-- USAGE EXAMPLES -->

## Usage

Once the app starts, you can create an account in `Register` page, and then login as student to find the various features of this project. Optionally, you can import the companies details using the MongoDB dump named `dump.zip` in project folder, using the command `mongorestore dump`. You can watch practice videos, have some discussion with your peers, and test yourself in quiz.

You can also use the code compiler and try to improve your programming skills. You can view the recruitment updates of companies in `Companies` dashboard.

<!-- CONTRIBUTING -->

## Contributing [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat-square)](https://github.com/vijethph/PlacementCell/pulls)

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

Vijeth P H - [@vijethph](https://github.com/vijethph)

Sathya M - [@sathya5278](https://github.com/sathya5278)

Project Link: [https://github.com/vijethph/PlacementCell](https://github.com/vijethph/PlacementCell)

## Thank You!

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)

If you like this project, please ⭐ this repo and share it with others 👍

<!-- ACKNOWLEDGEMENTS -->

## Acknowledgements

- [MongoDB Docs](https://docs.mongodb.com/)
- [React Framework Docs](https://reactjs.org)
- [Express Framework Docs](https://expressjs.com)
- [HackerEarth API Docs](https://www.hackerearth.com/docs/wiki/developers/v3/)
