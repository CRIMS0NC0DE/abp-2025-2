//Requisito TPI - Criar uma Classe 

export class TbSima {
  idsima: number | null;
  idestacao: string | null;
  datahora: Date | null;
  regno: number | null;
  nofsamples: number | null;
  proamag: number | null;
  dirvt: number | null;
  intensvt: number | null;
  u_vel: number | null;
  v_vel: number | null;
  tempag1: number | null;
  tempag2: number | null;
  tempag3: number | null;
  tempag4: number | null;
  tempar: number | null;
  ur: number | null;
  tempar_r: number | null;
  pressatm: number | null;
  radincid: number | null;
  radrefl: number | null;
  bateria: number | null;
  sonda_temp: number | null;
  sonda_cond: number | null;
  sonda_DOsat: number | null;
  sonda_DO: number | null;
  sonda_pH: number | null;
  sonda_NH4: number | null;
  sonda_NO3: number | null;
  sonda_turb: number | null;
  sonda_chl: number | null;
  sonda_bateria: number | null;
  corr_norte: number | null;
  corr_leste: number | null;
  co2_low: number | null;
  co2_high: number | null;
  precipitacao: number | null;

  constructor(
    idsima: number | null = null,
    idestacao: string | null = null,
    datahora: Date | null = null,
    regno: number | null = null,
    nofsamples: number | null = null,
    proamag: number | null = null,
    dirvt: number | null = null,
    intensvt: number | null = null,
    u_vel: number | null = null,
    v_vel: number | null = null,
    tempag1: number | null = null,
    tempag2: number | null = null,
    tempag3: number | null = null,
    tempag4: number | null = null,
    tempar: number | null = null,
    ur: number | null = null,
    tempar_r: number | null = null,
    pressatm: number | null = null,
    radincid: number | null = null,
    radrefl: number | null = null,
    bateria: number | null = null,
    sonda_temp: number | null = null,
    sonda_cond: number | null = null,
    sonda_DOsat: number | null = null,
    sonda_DO: number | null = null,
    sonda_pH: number | null = null,
    sonda_NH4: number | null = null,
    sonda_NO3: number | null = null,
    sonda_turb: number | null = null,
    sonda_chl: number | null = null,
    sonda_bateria: number | null = null,
    corr_norte: number | null = null,
    corr_leste: number | null = null,
    co2_low: number | null = null,
    co2_high: number | null = null,
    precipitacao: number | null = null,
  ) {
    this.idsima = idsima;
    this.idestacao = idestacao;
    this.datahora = datahora;
    this.regno = regno;
    this.nofsamples = nofsamples;
    this.proamag = proamag;
    this.dirvt = dirvt;
    this.intensvt = intensvt;
    this.u_vel = u_vel;
    this.v_vel = v_vel;
    this.tempag1 = tempag1;
    this.tempag2 = tempag2;
    this.tempag3 = tempag3;
    this.tempag4 = tempag4;
    this.tempar = tempar;
    this.ur = ur;
    this.tempar_r = tempar_r;
    this.pressatm = pressatm;
    this.radincid = radincid;
    this.radrefl = radrefl;
    this.bateria = bateria;
    this.sonda_temp = sonda_temp;
    this.sonda_cond = sonda_cond;
    this.sonda_DOsat = sonda_DOsat;
    this.sonda_DO = sonda_DO;
    this.sonda_pH = sonda_pH;
    this.sonda_NH4 = sonda_NH4;
    this.sonda_NO3 = sonda_NO3;
    this.sonda_turb = sonda_turb;
    this.sonda_chl = sonda_chl;
    this.sonda_bateria = sonda_bateria;
    this.corr_norte = corr_norte;
    this.corr_leste = corr_leste;
    this.co2_low = co2_low;
    this.co2_high = co2_high;
    this.precipitacao = precipitacao;
  }
}
