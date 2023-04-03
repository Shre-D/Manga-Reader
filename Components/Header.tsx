import {
  createStyles,
  Header,
  Autocomplete,
  Group,
  Burger,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import slugify from "react-slugify";
import { useDebouncedState } from "@mantine/hooks";
import { useRouter } from "next/router";

const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  inner: {
    height: rem(56),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  search: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },
}));

// interface HeaderSearchProps {
//   links: { link: string; label: string }[];
// }

export function HeaderSearch() {
  //my defined functions
  const [query, setQuery] = useDebouncedState("", 200);
  const [searchResults, setSearchResults] = useState<any>();
  const router= useRouter();

  const slug = slugify(query);

  const redirectToSearchPage=(e:any)=>{
    router.push({
      pathname: '/search',
      query: { keyword: query },
  })
    e.preventDefault()
  }

  useEffect(() => {
    const results: any = [];
    const handleSearch = async () => {
      if (
        query.length == 0 ||
        query.length == undefined ||
        query.length == null
      ) {
        setSearchdata([]);
      }
      const response = await (
        await fetch(`https://api.consumet.org/meta/anilist-manga/${query}`)
      ).json();

      if (response.results) {
        for (let i = 0; i < response.results.length; i++) {
          results.push(
            response.results[i].title.english ??
            response.results[i].title.romaji
          );
        }
        setSearchdata(results);
      }
      if (!response.results) {
        return;
      }
    };
    handleSearch();
  }, [query]);

  const initialSearchComponents = [
    "Naruto",
    "One Piece",
    "Berserk",
    "Vagabond",
    "Oyasumi Punpun",
    "Oshi no ko",
  ];
  const [searchdata, setSearchdata] = useState(initialSearchComponents);

  // const handleSearch=(e:any)=>{
  //   setQuery()
  //   const slug=slugify(query)
  //   console.log(slug);
  // }

  //Mantine does the work for me
  const [opened, { toggle }] = useDisclosure(false);
  const { classes } = useStyles();

  const data = {
    links: [
      {
        link: "https://mangadex.org/",
        label: "Mangadex",
      },
      {
        link: "/pricing",
        label: "Pricing",
      },
      {
        link: "/learn",
        label: "Learn",
      },
      {
        link: "/community",
        label: "Community",
      },
    ],
  };

  const items = data.links.map((link) => (
    <Link key={link.label} href={link.link} className={classes.link}>
      {link.label}
    </Link>
  ));

  return (
    <Header height={56} className={classes.header} mb={25}>
      <div className={classes.inner}>
        <Group>
          <Burger opened={opened} onClick={toggle} size="sm" />
          <Image src="/logo.png" width={80} height={28} alt="nothing" />
        </Group>

        <Group>
          <Group ml={50} spacing={5} className={classes.links}>
            {items}
          </Group>
          <form action="" onSubmit={(e)=>redirectToSearchPage(e)}>
          <Autocomplete
            className={classes.search}
            placeholder="Search"
            icon={<IconSearch size="1rem" stroke={1.5} />}
            data={searchdata}
            onChange={setQuery}
          />
          </form>
        </Group>
      </div>
    </Header>
  );
}
