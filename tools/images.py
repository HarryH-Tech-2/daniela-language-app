# The picture list: every generated image, its file name and its prompt.
# python tools/images.py jobs   -> writes tools/image-jobs.json for whoever generates them
# python tools/images.py build  -> converts img/raw/*.png to WebP and writes data/images.js
import json, os, sys

STYLE = ("Warm flat vector editorial illustration with soft paper grain, rounded friendly shapes, "
         "Caribbean palette of coral pink, sunflower yellow, turquoise, leafy green and deep plum. "
         "Cheerful, clean, uncluttered. Absolutely no text, letters, numbers, words or logos anywhere.")
DANI = "Daniela, a 26-year-old Colombian woman with long dark wavy hair and warm brown skin"
LOLA = "Lola, a scruffy little brown mixed-breed dog with floppy ears"
WORD = "Single clear idea centred on a plain warm cream background, like a picture-dictionary card. "

STORIES = {
  'home': f"{DANI} proudly showing a visitor the riverside promenade of Barranquilla at golden hour, palm trees, a gentle breeze, Carnaval flower decorations, a hot humid evening",
  'dance': f"{DANI} and her friend dancing salsa in a crowded, colourful old salsa bar with warm lights; an old man in a white hat dancing nearby; a queue outside the door",
  'kitchen': f"{DANI} cooking in a small sunny Colombian kitchen, frying arepas and patacones, a big pot of sancocho steaming, chopped vegetables, friends arriving at the door",
  'dogs': f"A dog-training class in a park; {DANI} holding a lead while {LOLA} sniffs the grass instead of listening; a friendly trainer holding treats",
  'plans': "Four young Colombian friends excitedly packing a small car for a weekend road trip to Cartagena, sunglasses, beach bags, sunscreen, colonial walls in the distance",
  'law-basics': f"{DANI} on her first day at a law firm, holding a pile of files, lawyers in suits, shelves of law books, a scale of justice on the wall",
  'crime': "A grand London courtroom: judge with wig, jury box, a nervous defendant, and a painting of a pink flamingo displayed as evidence",
  'gossip': "Three young Latin American women gossiping over coffee at a cafe table; one whispers behind her hand, the others lean in with wide eyes",
  'style': f"{DANI} in a shop fitting room trying on outfits, piles of clothes; {LOLA} on the floor happily chewing a high-heeled shoe",
  'wellness': f"{DANI} joyfully doing a dance fitness class with other women in a bright studio; an abandoned treadmill in the corner",
  'love': "A joyful wedding party on a Caribbean terrace with fairy lights, a happy couple dancing, friends throwing confetti",
  'abroad': "A young Colombian woman on a drizzly London street with an umbrella, a red double-decker bus and a polite queue at the bus stop, reading a letter from home",
  'regrets': "A young female law intern running up courthouse steps clutching legal papers, a big clock showing she is late, a small cup of black coffee in her other hand",
  'mystery': f"A family birthday party; a grandmother holding an empty plate; {LOLA} with crumbs on her nose looking innocent; a magnifying glass and footprints on the floor",
  'career': f"{DANI} at a crossroads: on one side a grey corporate law office in a cold city with a coat and scarf, on the other a bright, colourful dance studio of her own",
  'formal': f"{DANI} typing a serious formal email at a laptop; beside her, a colourful Carnaval dress on a hanger with a visible tear",
  'stage': "A salsa championship on a big stage: a couple mid-spin under a bright spotlight, glittering costumes, the audience giving a standing ovation",
  'critic': f"{DANI} as a food critic at a Caribbean restaurant table with fried fish, coconut rice and patacones, tasting thoughtfully with a small notebook beside her",
  'contracts': f"{DANI} at a desk reviewing a long contract with a highlighter and a magnifying glass over the small print, a cup of coffee, a dance-school brochure",
  'debate': f"A university debate hall with two podiums; {DANI} speaking confidently; a calm dog sitting in the audience",
  'native': f"A British back-garden barbecue under an overcast sky, people holding drinks and paper plates, {DANI} laughing with new friends",
  'true-crime': "A moody true-crime podcast scene: a studio microphone in the foreground and, behind it, an art gallery with a suspicious painting under a spotlight",
}

WORDS = {
  'home': {'humid': "a person sweating under a hot sun with steamy wavy air and water droplets", 'breeze': "palm trees and a woman's hair gently blown by a light wind", 'stroll': "a couple walking slowly and relaxed along a seaside promenade", 'crowded': "a street packed with lots of people at a festival"},
  'dance': {'rhythm': "musical notes and drum beats flowing with dancing feet", 'spin': "a woman turning around fast in a swirling dress", 'queue': "a line of people waiting one behind another", 'step on': "a dance partner accidentally standing on another person's toes", 'sweaty': "a dancer with drops of sweat on the forehead", 'exhausted': "a woman slumped on a sofa, completely tired", 'nervous': "a young woman biting her nails anxiously", 'show off': "a man doing a flashy dance move proudly while others watch"},
  'kitchen': {'chop': "a knife cutting onions into pieces on a chopping board", 'fry': "patacones sizzling in a pan of hot oil", 'stir': "a wooden spoon mixing soup in a pot in circles", 'boil': "a pot of water bubbling hard on the stove", 'season': "a hand sprinkling salt and pepper over food", 'dough': "soft corn dough being kneaded by hands", 'crispy': "golden crunchy fried patacones breaking with a crunch", 'leftovers': "food in plastic containers in a fridge the next day"},
  'dogs': {'lead': "a dog walking on a leash held by a person", 'treat': "a hand giving a small dog biscuit to a dog", 'obedient': "a dog sitting perfectly still and listening to its owner", 'bark': "a small dog barking loudly with sound waves", 'trainer': "a dog trainer teaching a dog to sit", 'sniff': "a dog smelling a flower with its nose", 'stubborn': "a dog refusing to move, sitting firmly while the owner pulls the lead"},
  'plans': {'pack': "a woman putting clothes into a suitcase", 'forecast': "a weather map showing sun and rain symbols for the coming days", 'split': "three friends dividing a restaurant bill equally", 'set off': "friends leaving home at sunrise with backpacks to start a journey", 'sunscreen': "a bottle of sun cream being applied on a beach"},
  'law-basics': {'lawyer': "a female lawyer in a suit holding a briefcase", 'court': "the outside of a grand courthouse with columns", 'sue': "one person pointing at another across a legal document with a gavel between them", 'judge': "a judge in a black robe holding a gavel", 'witness': "a person on the witness stand speaking with hand raised", 'evidence': "clue items in labelled bags: a fingerprint card, a photo, a key"},
  'crime': {'arrest': "a police officer putting handcuffs on a thief", 'defendant': "a nervous person sitting at a courtroom table next to a lawyer", 'jury': "twelve people sitting in a jury box listening", 'verdict': "a judge announcing a decision, gavel coming down", 'acquit': "a person leaving court smiling and free, arms raised in relief"},
  'gossip': {'gossip': "two women talking secretly about a third person", 'whisper': "a woman whispering into a friend's ear", 'spill the beans': "a jar of beans tipping over as a surprised woman covers her mouth", 'suspicious': "a woman narrowing her eyes, looking doubtful at someone"},
  'style': {'outfit': "a complete set of matching clothes laid out: dress, bag and shoes", 'fitting room': "a small changing cubicle in a shop with a curtain and mirror", 'skincare routine': "skincare bottles and a woman applying face cream in the mirror", 'moisturiser': "a jar of face cream", 'hairdresser': "a hairdresser cutting a woman's hair in a salon", 'heels': "a pair of red high-heeled shoes", 'dress up': "a woman putting on an elegant dress and jewellery for a party"},
  'wellness': {'work out': "a woman exercising with weights in a gym", 'stretch': "a woman stretching her arms and legs on a yoga mat", 'sore': "a woman holding her aching legs after exercise", 'hydrated': "a woman drinking a big bottle of water", 'nap': "a woman sleeping briefly on a sofa in the afternoon"},
  'love': {'ask out': "a nervous man inviting a woman on a date with flowers", 'turn down': "a woman politely saying no to a man offering a ring", 'fall for': "a woman with heart eyes falling in love", 'break up': "a couple turning away from each other, a heart split in two", 'settle down': "a couple with a cosy house and a dog, a calm happy life"},
  'abroad': {'drizzle': "light, fine rain falling on a city street", 'chilly': "a woman shivering in a coat and scarf on a cold day", 'homesick': "a woman looking sadly at a photo of her family and home far away", 'flatmate': "two young women sharing a small flat kitchen"},
  'regrets': {'deadline': "a calendar with a circled date and a clock running out", 'file': "a person handing official documents across a court counter"},
  'mystery': {'clue': "a magnifying glass over a small object on the floor", 'alibi': "a man showing a photo proving he was somewhere else", 'suspect': "three people in a police line-up", 'footprint': "muddy footprints and paw prints across a clean floor", 'crumb': "tiny bits of pastry on a plate", 'sneak': "a dog tiptoeing quietly towards a plate of food"},
  'career': {'CV': "a one-page resume document with a photo and sections", 'salary': "money being paid into a wallet at the end of the month", 'promotion': "a person climbing a step up a staircase to a higher office", 'hand in your notice': "an employee handing a resignation letter to a boss", 'be your own boss': "a woman proudly opening the doors of her own dance studio"},
  'formal': {'refund': "a shop assistant giving money back to a customer at the counter", 'faulty': "a broken item: a dress with a broken zip and a torn seam"},
  'stage': {'rehearse': "dancers practising a routine in a studio in front of a mirror", 'standing ovation': "an audience standing up and clapping enthusiastically", 'spotlight': "a single bright beam of light on a dancer on a dark stage", 'wardrobe malfunction': "a dancer on stage holding her dress where the zip has broken, surprised"},
  'critic': {'succulent': "a juicy, tender piece of grilled meat glistening on a plate", 'bland': "a bored face eating a plate of plain, boring food", 'tangy': "a face puckering after tasting a slice of lime"},
  'native': {'knackered': "a very tired woman collapsing onto a bed", 'help yourself': "a host gesturing generously to a table of food for guests", 'put your foot in it': "a woman covering her mouth in embarrassment after saying the wrong thing at a dinner party"},
  'true-crime': {'forgery': "a painter secretly copying a famous painting", 'loophole': "a person escaping through a small gap in a fence made of legal documents", 'unravel': "a ball of red thread coming undone, revealing a mystery"},
}


def slug(s):
    out = ''.join(c if c.isalnum() else '-' for c in s.lower()).strip('-')
    while '--' in out:
        out = out.replace('--', '-')
    return out


def jobs():
    out = []
    for u, p in STORIES.items():
        out.append({'id': 'story-' + u, 'raw': f'img/raw/story-{u}.png', 'aspect_ratio': '16:9', 'prompt': f'{p}. {STYLE}'})
    for u, ws in WORDS.items():
        for w, p in ws.items():
            out.append({'id': f'word-{u}-{slug(w)}', 'raw': f'img/raw/word-{u}-{slug(w)}.png', 'aspect_ratio': '1:1', 'prompt': f'{WORD}{p}. {STYLE}'})
    return out


def build():
    from PIL import Image
    os.makedirs('img/stories', exist_ok=True)
    os.makedirs('img/words', exist_ok=True)
    stories, words = {}, {}
    for u in STORIES:
        raw = f'img/raw/story-{u}.png'
        if os.path.exists(raw):
            im = Image.open(raw).convert('RGB')
            im.thumbnail((960, 960))
            im.save(f'img/stories/{u}.webp', 'WEBP', quality=78, method=6)
            stories[u] = f'img/stories/{u}.webp'
    for u, ws in WORDS.items():
        for w in ws:
            raw = f'img/raw/word-{u}-{slug(w)}.png'
            if os.path.exists(raw):
                im = Image.open(raw).convert('RGB')
                im.thumbnail((480, 480))
                p = f'img/words/{u}-{slug(w)}.webp'
                im.save(p, 'WEBP', quality=76, method=6)
                words[f'{u}:{w}'] = p
    with open('data/images.js', 'w', encoding='utf8') as f:
        f.write('// Generated by tools/images.py build. Pictures for stories and words.\n')
        f.write('// self is window on the page and the worker in sw.js, which caches these for offline use.\n')
        f.write('self.IMAGES = ' + json.dumps({'stories': stories, 'words': words}, indent=1, ensure_ascii=False) + ';\n')
    print(len(stories), 'stories,', len(words), 'words')


if __name__ == '__main__':
    os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
    if sys.argv[1:] == ['jobs']:
        j = jobs()
        json.dump(j, open('tools/image-jobs.json', 'w', encoding='utf8'), indent=1, ensure_ascii=False)
        print(len(j), 'jobs')
    elif sys.argv[1:] == ['build']:
        build()
    else:
        print(__doc__ or 'usage: images.py jobs|build')
