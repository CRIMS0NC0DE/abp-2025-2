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

class CampanhaPorTabela extends Entidade {
  idcampanhaportabela!: number;
  idtabela!: number;

  getId(): number {
    return this.idcampanhaportabela;
  }
}

class AbioticoColuna extends Entidade {
  idabioticocoluna!: number;
  idcampanha!: number;
  idsitio!: number;

  getId(): number {
    return this.idabioticocoluna;
  }
}

class BioticoSuperficie extends Entidade {
  idbioticosuperficie!: number;

    getId(): number {
    return this.idbioticosuperficie;
    }
}


class AguaMateriaOrganicaSedimento extends Entidade {
  idag!: number;
  
    getId(): number {
    return this.idag;
  }
}
