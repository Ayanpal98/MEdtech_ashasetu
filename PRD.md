# ASHASetu: Product Requirements Document & Manifesto

## Foundation Reframe
The industry defaults to defining the user as the health department or the government. **ASHASetu breaks this paradigm.**

> **The ASHA worker is the primary user. The government is the beneficiary of her work.**

Every subsequent design choice, from offline-first sync protocols to the vernacular voice interface, is driven by this single decision.

---

## The "Product Bible" Methodology
Our product development is not driven by office-bound assumptions. It is driven by field-validated friction.

### Field Validation Strategy (Step 0.2)
We do not "interview" users; we shadow them.
- **Protocol**: Spend one full uninterrupted working day with 5 ASHA workers in high-burden districts (Dhalai, Khowai).
- **Goal**: Document every micro-moment of friction, confusion, or fear. 
- **Output**: This documentation becomes the ASHASetu "Product Bible" — our most powerful investor story and our North Star for feature prioritization.

---

## Operational Audit: Paper-to-Digital Replacement (Step 0.3)
ASHASetu ships only when the "Paper Replacement Threshold" is met. We are not adding software; we are removing paper.

### Replacement List (Tripura Context)
We must collect and digitize every existing NHM register and claim format:
- **NHM Household Survey Registers**
- **MCP (Mother & Child Protection) Cards**
- **Incentive Claim Formats** (The most critical "hook" for user adoption)
- **High-Risk Case Trackers**
- **Medicine Stock Ledgers** (Sub-centre level)

---

## Core Principles
1. **Offline is Not a Feature, It's the Baseline**: In rural Tripura, connectivity is a luxury. ASHASetu must be 100% functional without internet.
2. **Vernacular-First Intelligence**: Kokborok and Bengali are not localizations; they are the core interface.
3. **Incentive Alignment**: If using the app doesn't save the ASHA worker time or help her claim her incentives faster, she won't use it.

---

## Phase 1: Core App Architecture

### 1.1 True Offline-First Engine
- **Persistence**: All data written to local SQLite first.
- **Sync**: Background sync queue with conflict resolution.
- **Metadata**: Every action timestamped with device clock + GPS coordinates.
- **Transparency**: Sync log visible to worker: "47 records waiting to upload — will sync when connected".

### 1.2 Digital Replacement of Paper
- **NHM Mapping**: 1:1 mapping of every NHM Tripura paper format.
- **Replica Generation**: Auto-generate printable PDF replicas of physical registers from app data.
- **Onboarding/Migration**: "Take a photo of your old register. We'll migrate your data. You won't need it again."

### 1.3 Vernacular-First Interface
- **District-Based Defaults**: Kokborok or Bengali based on geo-location first install.
- **Voice Intelligence**: 
    - Voice input for all text fields (STT).
    - Voice playback of any screen content (TTS) for accessibility.
- **Zero-Literacy Design**: Icon-driven navigation (no screen requires reading to operate).

### 1.4 Native Performance & Optimization
- **Hardware Profile**: Optimized for ₹4,000 Android phones.
- **Footprint**: Sub-100MB production build.
- **Battery Hygiene**: Audited for <8% drain per full working day.
