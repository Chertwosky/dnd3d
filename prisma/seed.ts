import { PrismaClient, RuleEntryType } from '@prisma/client';

const prisma = new PrismaClient();

const abilities = [
  {
    slug: 'strength',
    name: 'Сила',
    description: 'Физическая мощь персонажа, важная для атлетики, атак оружием ближнего боя и переносимого веса.',
    data: { abbreviation: 'STR', order: 1 },
  },
  {
    slug: 'dexterity',
    name: 'Ловкость',
    description: 'Проворство, реакция и баланс персонажа, влияющие на инициативу, класс брони и скрытность.',
    data: { abbreviation: 'DEX', order: 2 },
  },
  {
    slug: 'constitution',
    name: 'Телосложение',
    description: 'Выносливость и здоровье персонажа, влияющие на хиты и сопротивление вредным эффектам.',
    data: { abbreviation: 'CON', order: 3 },
  },
  {
    slug: 'intelligence',
    name: 'Интеллект',
    description: 'Память, логика и образованность персонажа.',
    data: { abbreviation: 'INT', order: 4 },
  },
  {
    slug: 'wisdom',
    name: 'Мудрость',
    description: 'Внимательность, интуиция и связь персонажа с окружающим миром.',
    data: { abbreviation: 'WIS', order: 5 },
  },
  {
    slug: 'charisma',
    name: 'Харизма',
    description: 'Сила личности, уверенность и способность влиять на других.',
    data: { abbreviation: 'CHA', order: 6 },
  },
] as const;

const skills = [
  { slug: 'acrobatics', name: 'Акробатика', ability: 'dexterity' },
  { slug: 'animal-handling', name: 'Уход за животными', ability: 'wisdom' },
  { slug: 'arcana', name: 'Магия', ability: 'intelligence' },
  { slug: 'athletics', name: 'Атлетика', ability: 'strength' },
  { slug: 'deception', name: 'Обман', ability: 'charisma' },
  { slug: 'history', name: 'История', ability: 'intelligence' },
  { slug: 'insight', name: 'Проницательность', ability: 'wisdom' },
  { slug: 'intimidation', name: 'Запугивание', ability: 'charisma' },
  { slug: 'investigation', name: 'Расследование', ability: 'intelligence' },
  { slug: 'medicine', name: 'Медицина', ability: 'wisdom' },
  { slug: 'nature', name: 'Природа', ability: 'intelligence' },
  { slug: 'perception', name: 'Восприятие', ability: 'wisdom' },
  { slug: 'performance', name: 'Выступление', ability: 'charisma' },
  { slug: 'persuasion', name: 'Убеждение', ability: 'charisma' },
  { slug: 'religion', name: 'Религия', ability: 'intelligence' },
  { slug: 'sleight-of-hand', name: 'Ловкость рук', ability: 'dexterity' },
  { slug: 'stealth', name: 'Скрытность', ability: 'dexterity' },
  { slug: 'survival', name: 'Выживание', ability: 'wisdom' },
] as const;

async function main() {
  for (const ability of abilities) {
    await prisma.ruleEntry.upsert({
      where: {
        type_slug: {
          type: RuleEntryType.ABILITY,
          slug: ability.slug,
        },
      },
      update: {
        name: ability.name,
        description: ability.description,
        data: ability.data,
      },
      create: {
        type: RuleEntryType.ABILITY,
        slug: ability.slug,
        name: ability.name,
        description: ability.description,
        data: ability.data,
      },
    });
  }

  for (const [index, skill] of skills.entries()) {
    await prisma.ruleEntry.upsert({
      where: {
        type_slug: {
          type: RuleEntryType.SKILL,
          slug: skill.slug,
        },
      },
      update: {
        name: skill.name,
        data: { ability: skill.ability, order: index + 1 },
      },
      create: {
        type: RuleEntryType.SKILL,
        slug: skill.slug,
        name: skill.name,
        data: { ability: skill.ability, order: index + 1 },
      },
    });
  }
}

main()
  .then(async () => {
    console.log(`Seeded ${abilities.length} abilities and ${skills.length} skills.`);
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
