export interface Facturas{
    FacturaID?:       number;         
    FechaDeCreacion?: Date;   
    TipoCita?:        string;     
    Subtotal?:        number;
    Total?:       number;
    SolicitanteID?:   number;
    Token?: string;
}


