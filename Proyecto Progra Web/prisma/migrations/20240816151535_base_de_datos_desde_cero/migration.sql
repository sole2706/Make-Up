-- CreateTable
CREATE TABLE `Usuario` (
    `UsuarioID` INTEGER NOT NULL AUTO_INCREMENT,
    `NombreUsuario` VARCHAR(191) NOT NULL,
    `ApellidoUsuario` VARCHAR(191) NOT NULL,
    `Telefono` INTEGER NOT NULL,
    `Correo` VARCHAR(191) NOT NULL,
    `Contrasena` VARCHAR(191) NOT NULL,
    `Token` VARCHAR(500) NULL,
    `Rol` ENUM('UsuarioNivel0', 'AdminNivel1') NULL DEFAULT 'UsuarioNivel0',

    PRIMARY KEY (`UsuarioID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reservacion` (
    `NumeroReservacion` INTEGER NOT NULL AUTO_INCREMENT,
    `FechaDeReservacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `TipoCita` VARCHAR(191) NOT NULL,
    `SolicitanteID` INTEGER NOT NULL,

    PRIMARY KEY (`NumeroReservacion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Factura` (
    `FacturaID` INTEGER NOT NULL AUTO_INCREMENT,
    `FechaDeCreacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `TipoCita` VARCHAR(191) NOT NULL,
    `Subtotal` INTEGER NOT NULL,
    `Total` INTEGER NOT NULL,
    `SolicitanteID` INTEGER NOT NULL,

    PRIMARY KEY (`FacturaID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Auditoria` (
    `AuditoriaID` INTEGER NOT NULL AUTO_INCREMENT,
    `DescripcionDeAccion` VARCHAR(191) NOT NULL,
    `FechaDeModificacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `FechaDeCreacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ActualizadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`AuditoriaID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Solicitantes` (
    `SolicitanteID` INTEGER NOT NULL AUTO_INCREMENT,
    `NombreSolicitante` VARCHAR(191) NOT NULL,
    `ApellidoSolicitante` VARCHAR(191) NOT NULL,
    `Telefono` INTEGER NOT NULL,
    `Correo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`SolicitanteID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Reservacion` ADD CONSTRAINT `Reservacion_SolicitanteID_fkey` FOREIGN KEY (`SolicitanteID`) REFERENCES `Solicitantes`(`SolicitanteID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Factura` ADD CONSTRAINT `Factura_SolicitanteID_fkey` FOREIGN KEY (`SolicitanteID`) REFERENCES `Solicitantes`(`SolicitanteID`) ON DELETE CASCADE ON UPDATE CASCADE;
