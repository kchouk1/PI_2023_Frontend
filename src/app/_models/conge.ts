export class Conge {
    id?: number;
    duree!: number;
    soldeConge!: number;
    dateDebut!: Date;
    dateFin!: Date;
    status!: StatusOfDemand;
}

enum StatusOfDemand {
    ACCEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED',
    NOT_YET_TREATED = 'NOT_YET_TREATED',
}
