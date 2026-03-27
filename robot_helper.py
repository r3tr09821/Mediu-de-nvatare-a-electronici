import random


PROJECTS = {
    "incepator": [
        {
            "nume": "Robot cu LED si buton",
            "componente": ["breadboard", "LED", "rezistor", "buton", "baterie"],
        },
        {
            "nume": "Robot care reactioneaza la lumina",
            "componente": ["LDR", "LED", "rezistor", "placa de control"],
        },
    ],
    "mediu": [
        {
            "nume": "Robot care evita obstacole",
            "componente": ["senzor ultrasonic", "driver motoare", "2 motoare", "baterie"],
        },
        {
            "nume": "Robot care urmareste o linie",
            "componente": ["senzori IR", "microcontroller", "2 motoare", "sasiu"],
        },
    ],
}


def afiseaza_proiecte():
    print("RoboStart Helper")
    print("-" * 30)
    nivel = input("Alege nivelul (incepator/mediu): ").strip().lower()

    if nivel not in PROJECTS:
        print("Nivel necunoscut. Incearca din nou cu: incepator sau mediu.")
        return

    proiect = random.choice(PROJECTS[nivel])
    print(f"\nPropunere: {proiect['nume']}")
    print("Componente recomandate:")
    for componenta in proiect["componente"]:
        print(f"- {componenta}")


if __name__ == "__main__":
    afiseaza_proiecte()
