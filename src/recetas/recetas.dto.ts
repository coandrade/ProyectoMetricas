import { CulturaGastronomica } from "../cultura-gastronomica/cultura-gastronomica.entity";

export class RecetasDTO {
    readonly id: number;
    readonly nombre: string;
    readonly descripcion: string;
    readonly foto: string;
    readonly preparacion: string;
    readonly video: string;
    readonly cultura: CulturaGastronomica
  }