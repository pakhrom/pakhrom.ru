<script lang="ts">
  let {
    endTime,
    onlyDate = false,
    lang = "en-US",
  }: {
    endTime: number;
    onlyDate?: boolean;
    lang?: "en-US" | "ru-RU";
  } = $props();

  const MILLISECONDS_PER_SECOND: number = 1000;
  const MILLISECONDS_PER_MINUTE: number = MILLISECONDS_PER_SECOND * 60;
  const MILLISECONDS_PER_HOUR: number = MILLISECONDS_PER_MINUTE * 60;
  const MILLISECONDS_PER_DAY: number = MILLISECONDS_PER_HOUR * 24;

  endTime *= 1000;
  let currentTime: number = $state(Date.now());
  let timeLeft: number = $derived(endTime - currentTime);
  let daysLeft: number = $derived(Math.floor(timeLeft / MILLISECONDS_PER_DAY));
  let hoursLeft: number = $derived(
    Math.floor(timeLeft / MILLISECONDS_PER_HOUR) % 24,
  );
  let minutesLeft: number = $derived(
    Math.floor(timeLeft / MILLISECONDS_PER_MINUTE) % 60,
  );
  let secondsLeft: number = $derived(
    Math.floor(timeLeft / MILLISECONDS_PER_SECOND) % 60,
  );

  setInterval(() => {
    currentTime += 100;
  }, 100);
</script>

{#if daysLeft}
  {daysLeft}
  {lang == "en-US" ? "days" : "дней"}{hoursLeft ? "," : ""}
  {#if !onlyDate && hoursLeft}
    {hoursLeft}
    {lang == "en-US" ? "hours" : "часов"}{minutesLeft ? "," : ""}
    {#if minutesLeft}
      {minutesLeft}
      {lang == "en-US" ? "minutes" : "минут"}{secondsLeft ? "," : ""}
      {#if secondsLeft}
        {secondsLeft}
        {lang == "en-US" ? "seconds" : "секунд"}
      {/if}
    {/if}
  {/if}
{/if}
