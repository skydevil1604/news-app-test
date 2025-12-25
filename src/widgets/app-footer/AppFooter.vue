<template>
  <footer class="footer">
    <AppContainer>
      <div class="inner">
        <p class="copy">
          Copyright {{ year }} Test. All rights reserved.
        </p>

        <div class="links">
          <a
            class="link"
            href="mailto:info@test.com"
          >
            <svg
              class="icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M4 6H20V18H4V6Z"
                stroke="currentColor"
                stroke-width="2"
              ></path>
              <path
                d="M4 7L12 13L20 7"
                stroke="currentColor"
                stroke-width="2"
              ></path>
            </svg>
            info@test.com
          </a>
          <a
            class="link"
            href="tel:+380953908751"
          >
            <svg
              class="icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M6.5 3.5H9.5L11 8L9 9.5C10.2 12 12 13.8 14.5 15L16 13L20.5 14.5V17.5C20.5 18.6 19.6 19.5 18.5 19.5C10.5 19.5 4.5 13.5 4.5 5.5C4.5 4.4 5.4 3.5 6.5 3.5Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linejoin="round"
              ></path>
            </svg>
            +380 95 390 87 51
          </a>
        </div>
      </div>
    </AppContainer>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { AppContainer } from '@/shared/ui/container';

const year = computed(() => new Date().getFullYear());
</script>

<style scoped lang="scss">
.footer {
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
}

.inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 14px;
  padding: 18px 0;
}

.copy {
  margin: 0;
  font-size: 13px;
  color: var(--color-muted);
}

.links {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 18px;
}

.link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-primary);
  text-decoration: none;
}

.icon {
  flex: 0 0 auto;
}

.link:hover {
  text-decoration: underline;
}

@media (max-width: 520px) {
  .inner {
    flex-direction: column;
    align-items: flex-start;
  }

  .links {
    justify-content: flex-start;
  }
}
</style>
