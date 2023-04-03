import { Card, Text, Badge, Button, Group,Spoiler } from '@mantine/core';
import Image from 'next/image';

function SearchCard({manga}:any) {
  const ratio=16/9
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder >
      <Card.Section component="a" href={manga.image} w={340} h={350} style={{
        position:'relative',
      }}>
        <Image
          src={manga.image}
          fill
          alt="manga"
          style={{
            objectFit:'fill',
          }}
        />
      </Card.Section>
      
      <Card.Section>
      <Group position="apart" mt="md" mb="xs">
        <Text weight={500} pl={10}>{manga.title.english}</Text>
        <Badge color="pink" variant="light" pr={10}>
          {manga.status}
        </Badge>
      </Group>

      <Text size="sm" color="dimmed" p={10}>
        <Spoiler maxHeight={90} showLabel="Show more" hideLabel="Hide">
        {manga.description}
        </Spoiler>
      </Text>
      </Card.Section>
      <Card.Section>
      <Button variant="light" color="blue" fullWidth mt="md" radius="md">
        Read Chapter 1
      </Button>
      </Card.Section>
    </Card>
  );
}

export default SearchCard