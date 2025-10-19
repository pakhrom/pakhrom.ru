<script lang="ts">
  import { onDestroy } from "svelte";

  let {
    endTime,
    dayOnly = false,
    labels,
    delimiter = " ",
    timeoutMessage,
    lang = "en-US",
  }: {
    endTime: number;
    dayOnly?: boolean;
    labels?: { d: string; h: string; m: string; s: string };
    delimiter?: string;
    timeoutMessage?: string;
    lang?: "en-US" | "ru-RU";
  } = $props();

  const LABELS_BY_LANG = {
    "en-US": {
      d: "d",
      h: "h",
      m: "m",
      s: "s",
    },
    "ru-RU": {
      d: "д",
      h: "ч",
      m: "м",
      s: "с",
    },
  };
  if (!labels) labels = LABELS_BY_LANG[lang];

  const MILLISECONDS_PER_SECOND: number = 1000;
  const MILLISECONDS_PER_MINUTE: number = MILLISECONDS_PER_SECOND * 60;
  const MILLISECONDS_PER_HOUR: number = MILLISECONDS_PER_MINUTE * 60;
  const MILLISECONDS_PER_DAY: number = MILLISECONDS_PER_HOUR * 24;

  endTime *= 1000;
  let currentTime: number = $state(Date.now());
  let timeLeft: number = $derived(Math.max(0, endTime - currentTime));
  let daysLeft: number = $derived(Math.floor(timeLeft / MILLISECONDS_PER_DAY));
  let hoursLeft: number = $derived(
    Math.floor(timeLeft / MILLISECONDS_PER_HOUR),
  );
  let minutesLeft: number = $derived(
    Math.floor(timeLeft / MILLISECONDS_PER_MINUTE),
  );
  let secondsLeft: number = $derived(
    Math.floor(timeLeft / MILLISECONDS_PER_SECOND),
  );

  let display: string | null = $derived.by(() => {
    if (timeoutMessage !== undefined && !timeLeft) return null;
    else {
      let res: string = "";
      if (!dayOnly) {
        res = (secondsLeft % 60).toString().concat(labels.s);
        res = (minutesLeft % 60).toString().concat(labels.m, delimiter, res);
        res = (hoursLeft % 24).toString().concat(labels.h, delimiter, res);
      }
      res = daysLeft.toString().concat(labels.d, dayOnly ? "" : delimiter, res);
      return res;
    }
  });

  let timeCountdown: ReturnType<typeof setInterval>;
  setTimeout(() => {
    timeCountdown = setInterval(() => {
      currentTime += 250;
      if (!timeLeft && timeCountdown) clearInterval(timeCountdown);
    }, 250);
  }, 250);

  onDestroy(() => clearInterval(timeCountdown));
</script>

{display ? display : timeoutMessage}
