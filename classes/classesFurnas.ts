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

class CamaraSolo extends Entidade {
  idcamarasolo!: number;

  getId(): number {
    return this.idcamarasolo;
  }
}

class Carbono extends Entidade {
  idcarbono!: number;

  getId(): number {
    return this.idcarbono;
  }
}