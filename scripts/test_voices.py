import asyncio
import edge_tts

async def main():
    t1 = "Je suis Oumar Sidibé, fondateur de RAMSIN. J'aide les entreprises à transformer leurs besoins métier en solutions web et mobiles concrètes."
    t2 = "Vous n'avez pas besoin d'avoir toutes les réponses, ni un cahier des charges parfait. Vous avez juste besoin d'expliquer ce qui vous ralentit ou ce que vous voulez créer. Parlons-en lors d'un premier échange de trente minutes, gratuit et sans engagement. RAMSIN. Des outils numériques conçus pour faire avancer votre activité."
    
    voices = [
        ("remy", "fr-FR-RemyMultilingualNeural"),
        ("henri", "fr-FR-HenriNeural"),
        ("fabrice", "fr-CH-FabriceNeural"),
        ("gerard", "fr-BE-GerardNeural"),
    ]
    
    for tag, v in voices:
        await edge_tts.Communicate(t1, v, rate="+1%").save(f"test_{tag}_sc4.mp3")
        await edge_tts.Communicate(t2, v, rate="+1%").save(f"test_{tag}_sc8.mp3")
        print(f"Generated {tag} ({v})")

if __name__ == "__main__":
    asyncio.run(main())
