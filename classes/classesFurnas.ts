abstract class Entidade {
    abstract getId(): string | number;
}

class ConcentracaoGasAgua extends Entidade {
    idconcentracaoagua!: number;

  getId(): number {
    return this.idconcentracaoagua;
  }
}

class ConcetracaoGasSedimento extends Entidade {
    idconcentracaogassed!: number;

    getId(): number {
    return this.idconcentracaogassed;
  }
}


class Biotico {
  idbiotico!:number;

  getId(): number {
    return this.idbiotico
  }
}

class BioticoSuperficie extends Biotico {
  idbioticosuperficie!:number;

  getId(): number {
    return this.idbioticosuperficie;
  }
}
