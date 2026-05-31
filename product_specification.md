# Product Specification v1: SST Q&A & Guides Platform (7-Day MVP)

This document outlines the simplified functional requirements and screen behaviors for the Scaler School of Technology (SST) Q&A and Guides platform. Optimized as a 7-Day MVP, it drops all non-essential features (NextAuth, Tagging systems, user accounts, and upvoting) to enable rapid launch.

---

## 1. Simplified User Roles & Access

| Role | Access Level | Description & Auth Mechanism |
| :--- | :--- | :--- |
| **Visitor** (Unauthenticated) | Read & Submit | * Accesses Homepage, Questions pages, Guides, and `/parents` hub.<br>* Can search locally or click dynamic Referral CTAs.<br>* Can submit questions via the `/ask` screen (stored as `PENDING` in the DB). |
| **Admin** (Single Password) | Read & Write | * Single-session author access via `/admin` using a single environment variable password (`ADMIN_PASSWORD`).<br>* No database user accounts or complex OAuth registrations.<br>* Can view the pending queue, draft answers, publish questions, and manage guides. |

---

## 2. Core Feature Specifications

### 2.1 Homepage (Journey-First Portal)
* **Header**: Navigation bar containing: Home, Explore SST, NSET, Student Life, Parents, Ask a Question.
* **Search / Autocomplete Input**: Simple filter search querying question titles. Underneath, shortcut links to 4 popular query paths:
  1. *Is SST worth it?*
  2. *Can I survive SST?*
  3. *SST vs BITS*
  4. *Degree validity*
* **Journey Shortcuts**: A grid of 4 cards:
  * *Exploring SST* (What is the program about?)
  * *Preparing for NSET* (Syllabus, math, interview prep)
  * *Offer Letter Guide* (Fees, laptop specifications)
  * *Parent Resources* (UGC degree validity, ROI)

### 2.2 Ask Question Form
* **Fields**: Question (Title), Details (Context), Email (Optional, for response notification).
* **Duplication Warning**: Dynamic accordion that suggests similar questions as the user types their title to prevent repeat entries.
* **Queueing**: Submitted questions are saved in the DB as `PENDING` and are hidden from visitors until the Admin writes an answer and clicks publish.

### 2.3 Autoritative Q&As
* Every dynamic question page has exactly one comprehensive, structured markdown answer written by the Admin. No public commenting or voting features.

### 2.4 Guides & Parents Page
* **Guides**: Static long-form reading layouts for 3-5 high-value guides (e.g. *Is SST Worth It?*, *Who Should NOT Join SST*, *SST vs BITS*).
* **Parents Hub**: Dedicated page focused on parent validation resources: UGC validity statements, ROI calculations, and parent-specific Q&As.

---

## 3. Screen Roadmap (Public & Admin)

1. **Home Screen (`/`)**: Journey links + query shortcuts.
2. **Question Page (`/questions/[slug]`)**: Question context -> Admin Answer -> Related Questions -> "Request a Reply" Lead block.
3. **Ask Page (`/ask`)**: Input forms with real-time duplicate check suggestions.
4. **Guide Page (`/guides/[slug]`)**: Rich markdown column + Table of Contents.
5. **Parent Hub (`/parents`)**: Crucial trust links + curated Q&As.
6. **Admin Queue (`/admin`)**: Clean queue dashboard protected by env password showing pending questions, inputs to write answers, and publish controls.
