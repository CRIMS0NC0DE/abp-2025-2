abstract class Entidade {
    abstract getId(): string | number;
}

class ConcentracaoGasAgua extends Entidade {
    idconcentracaoagua: number;

    constructor(idconcentracaoagua: number) {
        super();
        this.idconcentracaoagua = idconcentracaoagua;
    }

    getId(): number {
        return this.idconcentracaoagua;
    }
}

// ---

class ConcetracaoGasSedimento extends Entidade {
    idconcentracaogassed: number;

    constructor(idconcentracaogassed: number) {
        super();
        this.idconcentracaogassed = idconcentracaogassed;
    }

    getId(): number {
        return this.idconcentracaogassed;
    }
}

// ---

class CamaraSolo extends Entidade {
    idcamarasolo: number;

    constructor(idcamarasolo: number) {
        super();
        this.idcamarasolo = idcamarasolo;
    }

    getId(): number {
        return this.idcamarasolo;
    }
}

// ---

class Carbono extends Entidade {
    idcarbono: number;

    constructor(idcarbono: number) {
        super();
        this.idcarbono = idcarbono;
    }

    getId(): number {
        return this.idcarbono;
    }
}

// ---

class CampanhaPorTabela extends Entidade {
    idcampanhaportabela: number;
    idtabela: number;

    constructor(idcampanhaportabela: number, idtabela: number) {
        super();
        this.idcampanhaportabela = idcampanhaportabela;
        this.idtabela = idtabela;
    }

    getId(): number {
        return this.idcampanhaportabela;
    }
}

// ---

class AbioticoColuna extends Entidade {
    idabioticocoluna: number;
    idcampanha: number;
    idsitio: number;

    constructor(idabioticocoluna: number, idcampanha: number, idsitio: number) {
        super();
        this.idabioticocoluna = idabioticocoluna;
        this.idcampanha = idcampanha;
        this.idsitio = idsitio;
    }

    getId(): number {
        return this.idabioticocoluna;
    }
}

// ---

class BioticoSuperficie extends Entidade {
    idbioticosuperficie: number;

    constructor(idbioticosuperficie: number) {
        super();
        this.idbioticosuperficie = idbioticosuperficie;
    }

    getId(): number {
        return this.idbioticosuperficie;
    }
}

class AguaMateriaOrganicaSedimento extends Entidade {
    idag: number;

    constructor(idag: number) {
        super();
        this.idag = idag;
    }
    
    getId(): number {
        return this.idag;
    }
}
