interface PURPOSE {
    name: string;
    placeholder?: string;
    sections?: string[];
}

export enum PurposeName {
    Arrangement = "Arranjo",
    Discard = "Descartar",
    Donation = "Doação",
    Laundry = "Lavandaria",
    PersonalUse = "Uso Pessoal",
    PhotoShoot = "Photo Shoot",
    Recording = "Gravação",
    Rent = "Alugel",
}

export const PURPOSES: PURPOSE[] = [
    {
        name: PurposeName.Rent,
        placeholder: "Cliente",
    },
    {
        name: PurposeName.Arrangement,
        placeholder: "Costureiro",
    },
    {
        name: PurposeName.Discard,
    },
    {
        name: PurposeName.Donation,
        placeholder: "Descrição",
    },
    {
        name: PurposeName.Recording,
        placeholder: "Título",
        sections: ["Fashion Filme", "Filme", "Novela", "Publicidade", "Video Clip"],
    },
    {
        name: PurposeName.Laundry,
        placeholder: "Nome",
        sections: ["Interna", "Externa"],
    },
    {
        name: PurposeName.PhotoShoot,
        placeholder: "Descrição",
    },
    {
        name: PurposeName.PersonalUse,
        placeholder: "Técnico",
    },
];
