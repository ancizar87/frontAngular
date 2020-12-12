export class Producto {
    id?: number;
    opcionCaracteristica?: opcionCaracteristica[];
    imagenes?: imagenes[];
    rama?: string
    nombre?: string;
    nuevoProducto?: null | number;
    created?: string;
    updated?: string;
}

export class opcionCaracteristica {
    id?: number;
    UMedida?: string;
    codigoP?: string;
    descripcion?: string;
    precio?: string;
    precioPromo?: null | number;
    minimo?: number;
    disponibles?: number;
    opcion?: number
}

export class imagenes{
    id?: number;
    image?: string;
    service?: number
}
