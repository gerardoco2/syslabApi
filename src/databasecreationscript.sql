/* CREATE ANALISTAS TABLE*/
CREATE TABLE `syslab_db`.`analistas` ( `id` SERIAL NOT NULL , `nombre` VARCHAR(255) NOT NULL , `apellido` VARCHAR(255) NOT NULL , `email` INT(255) NOT NULL , `password` INT(255) NOT NULL , `estatus` INT(255) NOT NULL ) ENGINE = InnoDB; 

/* CREATE PACIENTES TABLE*/
CREATE TABLE `syslab_db`.`pacientes` ( `id` SERIAL NOT NULL ,
 `nombre` VARCHAR(255) NOT NULL , 
 `apellido` VARCHAR(255) NOT NULL ,
 `cedula` INT(8) NOT NULL ,
 `fecha_nac` NOT NULL ,
 `email` INT(255) NOT NULL ,
  `telefono` VARCHAR(255) NOT NULL ) ENGINE = InnoDB; 

  /* CREATE UNIDADES TABLE*/


  CREATE TABLE `syslab_db`.`unidades` ( `id` SERIAL NOT NULL ,
 `nombre` VARCHAR(255) NOT NULL , 
 `descripcion` VARCHAR(255) NOT NULL 
  ) ENGINE = InnoDB; 
