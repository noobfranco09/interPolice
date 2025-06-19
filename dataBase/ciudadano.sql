-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-06-2025 a las 00:23:02
-- Versión del servidor: 8.0.30
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `interpolice`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ciudadano`
--

CREATE TABLE `ciudadano` (
  `codigo` bigint NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) DEFAULT NULL,
  `alias` varchar(50) DEFAULT NULL,
  `fechaNacimiento` datetime NOT NULL,
  `planetaOrigen` varchar(100) NOT NULL,
  `planetaResidencia` varchar(100) NOT NULL,
  `foto` varchar(500) DEFAULT NULL,
  `qr` varchar(500) NOT NULL,
  `estado` tinyint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `ciudadano`
--

INSERT INTO `ciudadano` (`codigo`, `nombre`, `apellido`, `alias`, `fechaNacimiento`, `planetaOrigen`, `planetaResidencia`, `foto`, `qr`, `estado`) VALUES
(1, 'pepe', 'perez', 'elPepe', '2025-06-01 17:16:46', 'namekuzein', 'tierra', 'sads', 'sadsad', 0),
(2, 'prueba', 'apellidoPrueba', 'juanitoAlimaña', '2300-02-01 00:00:00', 'namekuzeí', 'tierra', 'urlFotoshñfudgsudv', 'gduwco47c3473483', 1),
(3, 'qr', 'qrPrueba', 'qrEnFuncionamiento', '2300-02-01 00:00:00', 'qr', 'qr', 'qr', '..\\public\\images\\undefinedqr.png', 1),
(4, 'qr', 'qrPrueba', 'qrEnFuncionamiento', '2300-02-01 00:00:00', 'qr', 'qr', 'qr', '..\\public\\images\\undefinedqr.png', 1),
(5, 'qr222222', 'qrPrueba', 'qrEnFuncionamiento', '2300-02-01 00:00:00', 'qr', 'qr', 'qr', '..\\public\\images\\5qrPrueba.png', 1),
(6, 'qr222222', 'qrPrueba', 'qrEnFuncionamiento', '2300-02-01 00:00:00', 'qr', 'qr', 'qr', '..\\public\\images\\6qr222222.png', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ciudadano`
--
ALTER TABLE `ciudadano`
  ADD PRIMARY KEY (`codigo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ciudadano`
--
ALTER TABLE `ciudadano`
  MODIFY `codigo` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
