# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

## Project Overview

OpenDirectory is a fully open-source, self-hosted directory engine powered by AI.
Built with Wasp ^0.19.x, shadcn/ui components, Motion animations, and TypeScript.
It enables anyone to run their own directory where listings automatically become 
optimized content, newsletters, and traffic.

## Development Commands

```bash
# Start database (required first)
wasp db start

# Run migrations
wasp db migrate-dev

# Start development server
wasp start

# Format code
npm run format

# Fix shadcn imports (if needed)
npm run fix-shadcn
```

## Environment Variables

Create `.env.server` with:
```bash
# Database
DATABASE_URL=postgresql://...

# OpenAI for content optimization
OPENAI_API_KEY=sk_...

# Stripe (optional)
STRIPE_SECRET_KEY=sk_...
STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_PRICE_ID=price_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

## Architecture

### Wasp Configuration

- `main.wasp` - Central configuration for routes, pages, actions, queries, and
  APIs
- `schema.prisma` - Database entities (Prisma models)
- Always define operations in `main.wasp` first, then implement in feature's
  `operations.ts`

### Feature-Based Structure

```
src/
├── admin/             # Directory management dashboard
│   └── pages/         # Admin pages (dashboard)
├── ai/                # AI content optimization services  
│   └── openai/        # OpenAI integration and service
├── auth/              # Authentication pages and logic
├── landing/           # Public landing page
├── payment/           # Stripe integration (optional)
│   └── stripe/        # Stripe operations, webhooks, service
├── root-components/   # Global components (nav, footer, theme)
├── client/components/ # shadcn/ui components and directory-specific UI
├── motion/            # Motion animation config and components
├── hooks/             # Custom React hooks
└── lib/               # Utilities and setup
```

Each feature folder typically contains:

- `FeaturePage.tsx` - Page components
- `operations.ts` - Actions and queries (when applicable)
- `components/` - Feature-specific components
- `CLAUDE.md` - Feature-specific documentation

### Creating New Operations

When adding new queries/actions:

1. Define in `main.wasp` first:

```wasp
query getSomething {
  fn: import { getSomething } from "@src/feature/operations",
  entities: [Entity1, Entity2]
}
```

2. Implement in `feature/operations.ts`:

```typescript
import { HttpError } from 'wasp/server'
import type { GetSomething } from 'wasp/server/operations'

export const getSomething = (async (args, context) => {
  if (!context.user) {
    throw new HttpError(401, 'Unauthorized')
  }

  return context.entities.Something.findMany()
}) satisfies GetSomething

// Export response type for components
export type GetSomethingResponse = Awaited<ReturnType<typeof getSomething>>
```

**Critical points:**

- Use `satisfies GetSomething` pattern (not `GetSomething = async`)
- Export response type with `Awaited<ReturnType<...>>` for component props
- Include authorization checks when needed

### OpenDirectory Data Models

The core entities for the directory system:

```prisma
// User with directory roles
model User {
  role    UserRole @default(SUBMITTER)  // OWNER | SUBMITTER
  isAdmin Boolean  @default(false)
  listings Listing[]  // Submitted listings
}

// Directory listings
model Listing {
  title     String
  slug      String        @unique
  url       String?
  shortDesc String?
  contentMd String        // AI-optimized markdown content
  status    ListingStatus @default(PENDING)
  
  category   Category?     // Optional categorization
  tags       ListingTag[]  // Many-to-many with tags
  submitter  User?         // Who submitted it
}

// Status: DRAFT → PENDING → APPROVED/REJECTED → ARCHIVED
enum ListingStatus {
  DRAFT, PENDING, APPROVED, REJECTED, ARCHIVED
}
```

### Wasp Conventions

- Add new entities to `schema.prisma`, not `main.wasp`
- Store operations in `feature/operations.ts` files  
- Use Wasp's `Link` component for internal navigation
- Organize by features, not technical layers

## Key Conventions

### Imports

- Wasp: `import { Entity } from 'wasp/entities'`,
  `import { type Op } from 'wasp/server/operations'`
- Motion: `import { motion } from 'motion/react'` (not framer-motion)
- React hooks directly: `import { useState } from 'react'` (no React default
  import)
- Use relative imports in src (no @ alias)

### Styling

- Tailwind CSS with semantic color naming (e.g., `text-destructive` not
  `text-red-500`)
- Icons: `@phosphor-icons/react`
- Mobile-first approach

### Forms

- React Hook Form with Zod validation
- shadcn/ui Form components

### Code Style

- No semicolons, single quotes, JSX single quotes
- No comments unless describing complex logic
- Dependencies via `npm install` (not in main.wasp)

### Database Changes

- Forward-only migrations (never rename fields directly)
- Run `wasp db migrate-dev` after schema.prisma changes

## AI Integration

### OpenAI Service

The `src/ai/openai/service.ts` provides a singleton service for AI content optimization:

```typescript
import { OpenAIService } from '@src/ai/openai/service'

// Get instance (requires OPENAI_API_KEY in environment)
const aiService = OpenAIService.getInstance()

// Generate optimized content
const result = await aiService.generateOutput(prompt, 'json')
```

**Key features:**
- Rate limiting (3 requests/second by default)  
- JSON response cleaning and validation
- Uses `o3-mini` model by default
- Comprehensive error handling for API issues

**Environment setup:**
```bash
# Required in .env.server
OPENAI_API_KEY=sk_...
```

## Directory Workflows

### Listing Lifecycle

1. **DRAFT** - User creates listing (optional state)
2. **PENDING** - Submitted for review
3. **APPROVED** - Published to directory
4. **REJECTED** - Declined with feedback
5. **ARCHIVED** - Removed from public view

### User Roles

- **OWNER** - Directory admin, approves listings
- **SUBMITTER** - Can submit and edit own listings

### Content Optimization

Listings submitted with raw content get AI optimization for:
- Clean markdown formatting
- SEO-optimized descriptions
- Consistent structure across directory
