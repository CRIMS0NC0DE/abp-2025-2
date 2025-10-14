// Classes das Tabelas do Banco de Dados SIMA
abstract class Entity {
  abstract getId(): string | number;
}

class Estacao extends Entity {
  idestacao!: string;
  idhexadecimal!: string;
  rotulo!: string;
  lat!: number;
  lng!: number;
  inicio!: Date;
  fim!: Date | null;

  getId(): string {
    return this.idestacao;
  }
}

class Sensor extends Entity {
  idSensor!: number;
  nome!: string;
  fabricante!: string;
  modelo!: string;
  faixa!: string;
  precisao!: string;

  getId(): number {
    return this.idSensor;
  }
}

class CampoTabela extends Entity {
  idcampotabela!: number;
  idSensor!: number; // FK
  nomecampo!: string;
  rotulo!: string;
  unidademedida!: string;
  ordem!: number;

  getId(): number {
    return this.idcampotabela;
  }
}

class Sima extends Entity {
  idSima!: number;
  idestacao!: string; // FK
  datahora!: Date;
  regno!: number;
  nOfSamples!: number;

  proman!: number;
  dirvt!: number;
  intensvt!: number;
  u_vel!: number;
  v_vel!: number;

  tempag1!: number;
  tempag2!: number;
  tempag3!: number;
  tempag4!: number;
  tempar!: number;
  ur!: number;
  tempar_r!: number;
  pressatm!: number;
  radincid!: number;
  radref!: number;

  bateria!: number;
  sonda_temp!: number;
  sonda_cond!: number;
  sonda_DOsat!: number;
  sonda_DO!: number;
  sonda_pH!: number;
  sonda_NH4!: number;
  sonda_NO3!: number;
  sonda_turb!: number;
  sonda_Chl!: number;
  sonda_bateria!: number;

  corr_norte!: number;
  corr_leste!: number;
  co2_low!: number;
  co2_high!: number;
  precipitacao!: number;

  getId(): number {
    return this.idSima;
  }
}

class SimaOffline extends Sima {
  idSimaOffline!: number;

  fonteradiometro!: number;
  bateriapainel!: number;

  override getId(): number {
    return this.idSimaOffline;
}
}