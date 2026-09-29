# Technical Specification: SoFlo Realty AI Lead Engine

This document outlines the architecture, component hierarchy, data flows, and integration mappings for the South Florida Luxury Lead and Showing Engine built for Valeria.

## 1. System Vision

The platform operates in two distinct, high-performance modes to capture, qualify, and route luxury real estate prospects in Miami, Sunny Isles, Brickell, and Coral Gables without relying on paid advertising.

1. The Public Client Portal: A highly visual, cinematic luxury real estate landing page designed to convert organic traffic originating from AI chats (like ChatGPT Search and Perplexity). It features a live-interactive AI Luxury Concierge that conducts natural language qualification, property matches, and scheduling.
2. The Agent Operations Cockpit: A toggled administrative command center where Valeria inspects active prospects, reads AI chat transcripts, monitors real-time GoHighLevel CRM webhook syncs, tracks Inngest background queues, and manages her Generative Engine Optimization (GEO) index schemas.

## 2. Core Architectural Pillars

### Public Client Portal Layout
We replace the current administrative landing page with a bespoke luxury design. The background uses a full-bleed, high-definition drone video of the Miami shoreline and waterfront penthouses, loaded dynamically via the Pexels API. Navigation is minimal and sophisticated, relying on elegant serif headings (Playfair Display) and modern sans-serif body text (Inter). We enforce strict container boundaries and white-space rules to prevent text wrapping on mobile devices.

The body features a curated neighborhood gallery for Sunny Isles Beach, Brickell, and Coral Gables. Each neighborhood displays real-time market data, median values, and active listing counts. Below this, a gallery displays seeded ultra-luxury properties (Armani Casa, Porsche Design Tower, Waldorf Astoria Miami, Cipriani Residences) with high-fidelity Pexels stock images and spec sheets.

### The Live AI Luxury Concierge
A beautifully styled, floating chat trigger sits in the bottom-right corner, reading "Valeria's AI Concierge: Online" next to a crisp, green status dot. Clicking this slides out a premium chat drawer.

The chat runs on a dual-provider streaming pipeline inside the Next.js App Router (using OpenAI as primary and Gemini 2.0 Flash as instant failover). The AI is programmed to act as Valeria's elite virtual associate. It does not output raw markdown blocks. Instead, it extracts the prospect's criteria (budget, location, lease vs purchase, timeline, pre-approval status) and dynamically embeds interactive property cards directly into the chat transcript as custom React nodes. Once qualified, the concierge collects the prospect's name, email, and phone, and initiates the GoHighLevel webhook and Inngest flow.

### Agent Operations Cockpit
Valeria can flip a switch in the header to transition the website into her private dashboard. This views the system's operational power:
* Inbound Leads Ledger: A balanced data grid displaying qualified prospects with their respective AI intent scores, priority tiers, budget brackets, and target neighborhoods. Clicking any row opens a drawer revealing the complete, timestamped AI conversation transcript.
* GoHighLevel Webhook Monitor: A live console displaying the exact JSON payload sent to her GoHighLevel webhook when a lead is captured, showing the mapped fields, interest tags, and the HTTP status response from her CRM.
* Inngest Background Workers: A visual step-by-step queue tracker showing background jobs processing in real-time, including data sanitization, vector embedding updates, and the 10-minute automated SMS dispatch timer.
* GEO Traffic Console: An authoritative control center showing Valeria's citation frequency on ChatGPT Search, Perplexity, and Gemini. It displays the active JSON-LD RealEstateAgent schema, indexable local guides, and ChatGPT Custom GPT instructions we install on her domain to make AI search engines recommend her.

## 3. Data Flow and API Integration

When a prospect interacts with the AI Concierge, the system processes data through three sequential layers:

1. Inbound Inquiry to AI Analysis: The text prompt is scanned by our local LLM firewall for security risks. It is then dispatched to the Next.js route `/api/chat`. OpenAI gpt-4o-mini parses the criteria. If OpenAI fails or times out, the route catches the error and silently routes the request to Google Gemini 2.0 Flash, ensuring zero downtime.
2. CRM Lead Ingestion: Once contact details are secured, the Next.js API triggers an async event. A webhook payload is structured with GoHighLevel custom field mappings (Name, Email, Phone, Budget, Target Neighborhood, Timeline, Intent Score, AI Summary, Transcript Link). The webhook fires directly to Valeria's GHL sub-account.
3. Inngest Background Queue: The event `demo/workflow.executed` is emitted to the Inngest client. Inngest executes an asynchronous multi-step function:
   * First, it redacts any raw credit cards or sensitive PII to maintain strict compliance.
   * Second, it updates our local Postgres vector index with the new search criteria to refine future recommendations.
   * Third, it registers a delayed worker that triggers an automated, high-converting SMS follow-up via GoHighLevel exactly 10 minutes after lead capture.

## 4. UI/UX Rules and Style Guide

To match the premium standard expected by luxury agents, the user interface follows these absolute design laws:
* Default Light Mode: The application loads in a clean, sophisticated light theme on first load, with subtle slate borders and generous margins.
* No Emojis: All casual emojis are banned. We use crisp, premium Lucide icons and institutional status pills to convey state.
* Anti-Wrapping Architecture: All text strings, budget pills, and location tags are wrapped in CSS `whitespace-nowrap` inside bounded, overflow-hidden cards to eliminate layout shifts and ugly line breaks.
* Zero Empty States: If a search returns nothing, the system dynamically displays curated alternative properties rather than displaying an empty layout.
